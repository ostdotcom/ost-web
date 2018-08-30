module CacheManagement

  class Base

    include Util::ResultHelper

    # Initialize
    #
    # * Author: Puneet
    # * Date: 01/02/2018
    # * Reviewed By:
    #
    # @param [Array] identifiers (mandatory) - ids which would form cache keys
    # @param [Hash] options (optional) - optional params which might be needed in forming cache key
    #
    # @return [CacheManagement::Base]
    #
    def initialize(identifiers, options = {})

      @identifiers = identifiers
      @options = options

      @id_to_cache_key_map = {}

    end

    # Clear cache
    #
    # * Author: Puneet
    # * Date: 01/02/2018
    # * Reviewed By:
    #
    def clear

      set_id_to_cache_key_map

      @id_to_cache_key_map.each do |_, key|
        Memcache.delete(key)
      end

      nil

    end

    # Fetch from cache and for cache misses call fetch_from_source
    #
    # * Author: Puneet
    # * Date: 01/02/2018
    # * Reviewed By:
    #
    # @return [Hash]
    #
    def fetch

      set_id_to_cache_key_map

      data_from_cache = Memcache.read_multi(@id_to_cache_key_map.values)

      identifiers_for_cache_miss = []
      @identifiers.each do |identifier|
        identifiers_for_cache_miss << identifier if data_from_cache[@id_to_cache_key_map[identifier]].nil?
      end

      if identifiers_for_cache_miss.any?

        fetch_data_rsp = fetch_from_source(identifiers_for_cache_miss)

        data_to_set = fetch_data_rsp.data || {}

        set_cache(data_to_set) if fetch_data_rsp.success?

      end
      @identifiers.inject({}) do |data, identifier|
        data[identifier] = data_from_cache[@id_to_cache_key_map[identifier]] || data_to_set[identifier] || {}
        data
      end

    end

    private

    # Fetch from db
    #
    # * Author: Puneet
    # * Date: 01/02/2018
    # * Reviewed By:
    #
    # @return [Result::Base]
    #
    def fetch_from_source(cache_miss_ids)
      fail 'sub class to implement'
    end

    # Fetch cache key
    #
    # * Author: Puneet
    # * Date: 01/02/2018
    # * Reviewed By:
    #
    # @return [String]
    #
    def get_cache_key(id)
      fail 'sub class to implement'
    end

    # Fetch cache expiry (in seconds)
    #
    # * Author: Puneet
    # * Date: 01/02/2018
    # * Reviewed By:
    #
    # @return [Integer]
    #
    def get_cache_expiry
      fail 'sub class to implement'
    end

    # Set Id to Cache Key Map
    #
    # * Author: Puneet
    # * Date: 01/02/2018
    # * Reviewed By:
    #
    def set_id_to_cache_key_map
      @identifiers.each do |id|
        @id_to_cache_key_map[id] = get_cache_key(id)
      end
    end

    # set cache using data provided (data is indexed by id)
    #
    # * Author: Puneet
    # * Date: 01/02/2018
    # * Reviewed By:
    #
    def set_cache(cache_data)
      cache_data.each do |id, data|
        Memcache.write(@id_to_cache_key_map[id], data, get_cache_expiry)
      end
    end

  end

end