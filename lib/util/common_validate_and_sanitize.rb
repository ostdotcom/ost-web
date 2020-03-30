module Util

  class CommonValidateAndSanitize

    REGEX_EMAIL = /\A[A-Z0-9]+[A-Z0-9_%+-]*(\.[A-Z0-9_%+-]{1,})*@(?:[A-Z0-9](?:[A-Z0-9-]*[A-Z0-9])?\.)+[A-Z]{2,24}\Z/mi

    # for integer array
    #
    # @return [Boolean] returns a boolean
    # modifies objects too
    #
    def self.integer_array!(objects)
      return false unless objects.is_a?(Array)

      objects.each_with_index do |o, i|
        return false unless CommonValidator.is_numeric?(o)

        objects[i] = o.to_i
      end

      return true
    end

    def self.is_valid_email?(email)
      email =~ REGEX_EMAIL
    end

  end

end
