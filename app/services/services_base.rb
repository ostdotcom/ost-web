class ServicesBase

  include Util::ResultHelper

  attr_reader :params


  # Initialize ServiceBase instance


  def initialize(service_params={})
    service_klass = self.class.to_s
    service_params_list = ServicesBase.get_service_params(service_klass)

    # passing only the mandatory and optional params to a service
    permitted_params_list = ((service_params_list[:mandatory] || []) + (service_params_list[:optional] || [])) || []

    permitted_params = {}

    permitted_params_list.each do |pp|
      permitted_params[pp] = service_params[pp]
    end

    @params = HashWithIndifferentAccess.new(permitted_params)
  end

  # Method to get service params from yml file
  #
  def self.get_service_params(service_class)
    # Load mandatory params yml only once
    @mandatory_params ||= YAML.load_file(open(Rails.root.to_s + '/app/services/service_params.yml'))
    @mandatory_params[service_class]
  end



  def get_route_content
    preview_request ? StaticApi::Cms.new().get_content_of(get_preview_routes) :  CacheManagement::DynamicContent.new(get_routes).fetch
  end



  # Check if request is preview request or publish request based on timestamp and authenticity of token
  #
  # * Author: Mayur
  # * Date: 31-08-2018
  # * Reviewed by:
  #
  def preview_request
    verify_for_preview
  end

  private

  # Method to validate presence of params
  #
  # @return [Result::Base]
  #
  def validate
    # perform presence related validations here
    # result object is returned
    service_params_list = ServicesBase.get_service_params(self.class.to_s)
    missing_mandatory_params = []

    service_params_list[:mandatory].each do |mandatory_param|
      missing_mandatory_params << mandatory_param if @params[mandatory_param].to_s.blank?
    end if service_params_list[:mandatory].present?

    return error_result('sb_1',
                        'Mandatory params missing.') if missing_mandatory_params.any?

    success_with_data({})
  end

  # Create preview url based on input params and secret signature
  #
  # * Author: Mayur
  # * Date: 3-09-2018
  # * Reviewed by:
  #
  def create_raw_preview_url
    ts = params['ts'] ? params['ts'] : ''
    GlobalConstant::Base.root_url + params['path'] + '?ts=' + ts + '&ps=' + GlobalConstant::Base.cms[:sha256_salt]
  end



  # Check if preview signature is valid and url is not expired
  #
  # * Author: Mayur
  # * Date: 3-09-2018
  # * Reviewed by:
  #
  def verify_for_preview
    params['ts'].present? and params['ps'].present? ?   is_valid_signature && ! is_token_expired : false
  end


  # Check if preview signature is valid
  #
  # * Author: Mayur
  # * Date: 3-09-2018
  # * Reviewed by:
  #
  def is_valid_signature
    params['ps'] == preview_signature
  end


  def preview_signature
    Sha256.new({string: create_raw_preview_url, salt: GlobalConstant::Base.cms[:sha256_salt]}).perform
  end



  # Check if url is expired (i.e. older than particular threshold time)
  #
  # * Author: Mayur
  # * Date: 3-09-2018
  # * Reviewed by:
  #
  def is_token_expired
    input_ts = params['ts'].to_i
    threshold_time = Time.now - 5 * 60 # check if token is older than 5 minutes
    input_ts < threshold_time.to_i
  end



end