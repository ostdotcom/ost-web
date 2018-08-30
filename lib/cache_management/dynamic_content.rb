module CacheManagement

  class DynamicContent < CacheManagement::Base

    private

    # Fetch from db
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [Hash]
    #
    def fetch_from_source(cache_miss_routes)
      data_to_set = {}
      responses = StaticApi::S3.new().get_content_of(cache_miss_routes)
      responses.each do |route, response|
        if response.success?
          data_to_set[route] = response.data
        else
          Rails.logger.error("S3 get #{route} failed #{response}")
        end
      end
      success_with_data(data_to_set)
    end

    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [MemcacheKey]
    #
    def memcache_key_object
      @m_k_o ||= MemcacheKey.new('dynamic_content.s3')
    end

    # Fetch cache key
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [String]
    #
    def get_cache_key(route)
      memcache_key_object.key_template % @options.merge(route: GlobalConstant::StaticContentRoute.shorten(route))
    end

    # Fetch cache expiry (in seconds)
    #
    # * Author: Sunil
    # * Date: 28/08/2018
    # * Reviewed By:
    #
    # @return [Integer]
    #
    def get_cache_expiry
      memcache_key_object.expiry
    end

  end

end