namespace :cron_task do

  # Fetch and set the dynamic content cache
  #
  # * Author: Pankaj
  # * Date: 22/01/2018
  # * Reviewed By:
  #
  desc "rake RAILS_ENV=development cron_task:set_dynamic_content_cache"
  desc "*/5 * * * * cd /mnt/ost_web/current && rake RAILS_ENV=development cron_task:set_dynamic_content_cache >> /mnt/ost_web/shared/log/set_dynamic_content_cache.log"
  task :set_dynamic_content_cache  => [:environment] do |task|

    memcache_key_obj = CacheManagement::DynamicContent.new(GlobalConstant::StaticContentFileName.all_file_names).get_memcache_key_obj
    ttl = memcache_key_obj.expiry
    on_disk_path = "#{Rails.root.to_s}/log/"

    Rails.logger.info("Fetching Data from S3 for: #{GlobalConstant::StaticContentFileName.all_file_names}")

    responses = StaticApi::S3.new().get_content_of(GlobalConstant::StaticContentFileName.all_file_names)

    Rails.logger.info("Fetched Data from S3")

    responses.each do |route, response|
      file_path = "#{on_disk_path}/#{route}"
      if response.success?
        response_data = response.data
        File.open(file_path, "w+") do |f|
          f.write(Oj.dump(response_data, mode: :compat))
        end
      else
        response_data = Oj.load(File.read(file_path), mode: :strict) rescue nil
      end

      if !response_data.nil?
        Rails.logger.info("Setting Cache For: #{route}")
        memcache_key = memcache_key_obj.key_template % {route: GlobalConstant::StaticContentFileName.shorten(route)}
        Rails.cache.write(memcache_key, response_data, {expires_in: ttl})
      else
        # TODO: Send error email
        puts "Error:"
        puts response_data.inspect
      end
    end

  end
  
end