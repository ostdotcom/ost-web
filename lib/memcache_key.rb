class MemcacheKey

  attr_reader :key_template, :expiry

  def initialize(entity)
    buffer = self.class.config_for_entity(entity)
    @key_template = buffer[:key_template]
    @expiry = buffer[:expiry]
  end

  private

  def self.config_for_entity(entity)
    config_for_all_keys[entity.to_sym]
  end

  def self.config_for_all_keys
    @memcache_config ||= begin
      memcache_config = YAML.load_file(GlobalConstant::Cache.keys_config_file)
      memcache_config.inject({}) do |formatted_memcache_config, (group, group_config)|
        group_config.each do |entity, config|
          prefix = 'ow'
          formatted_memcache_config["#{group}.#{entity}".to_sym] = {
              key_template: "#{prefix}_#{GlobalConstant::Base.environment_name_short}_#{config['key_template']}",
              expiry: config['expiry_in_seconds'].to_i
          }
        end
        formatted_memcache_config
      end
    end
  end

end