class Sha256

  # Initialize
  #
  def initialize(params)
    @string = params[:string]
    @salt = params[:salt]
    @digest_byte_value = nil
  end

  # Perform
  #
  def perform
    get_digest_using_salt
  end

  private

  # Get Digest
  #
  def get_digest_using_salt
    get_digest_in_bytes
    digest_byte_value_to_hexadecimal
  end

  # Make 64 byte Digest
  #
  def get_digest_in_bytes
    hkdf_obj = HKDF.new(@string, salt: @salt, algorithm: 'SHA256')
    @digest_byte_value = hkdf_obj.next_bytes(64)
  end

  # Convert each byte to headecimal value
  #
  def digest_byte_value_to_hexadecimal
    @digest_byte_value.each_byte.map { |b| b.to_s(16) }.join
  end

end