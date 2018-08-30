namespace :cron_task do

  # Retry email service api hook jobs for failed entries
  #
  # * Author: Pankaj
  # * Date: 22/01/2018
  # * Reviewed By:
  #
  desc "rake RAILS_ENV=development cron_task:set_dynamic_content_cache"
  desc "*/5 * * * * cd /mnt/ost_web/current && rake RAILS_ENV=development cron_task:set_dynamic_content_cache >> /mnt/ost_web/shared/log/set_dynamic_content_cache.log"
  task :set_dynamic_content_cache  => [:environment] do |task|

    memcache_key_obj = MemcacheKey.new('dynamic_content.s3')
    ttl = memcache_key_obj.expiry

    puts("Fetching Data from S3 for: #{GlobalConstant::StaticContentRoute.all_routes}")

    responses = StaticApi::S3.new().get_content_of(GlobalConstant::StaticContentRoute.all_routes)

    puts("Fetched Data from S3")

    responses.each do |route, response|
      if response.success?
        puts("Setting Cache For: #{route}")
        memcache_key = memcache_key_obj.key_template % {route: GlobalConstant::StaticContentRoute.shorten(route)}
        Rails.cache.write(
          memcache_key,
          response.data,
          {expires_in: ttl}
        )
      else
        puts("S3 get #{route} failed #{response}")
      end
    end

  end
  
end