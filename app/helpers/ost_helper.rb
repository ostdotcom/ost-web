module OstHelper

  def get_current_quater_roadmap_status (this_year, this_quarter)
    year = Time.now.year
    quarter = ((Time.now.month - 1) / 3) + 1

    if (this_year < year)
      'Complete'
    elsif (this_year > year)
      'Upcoming'
    else
      if (this_quarter < quarter)
        'Complete'
      elsif (this_quarter == quarter)
        'In Progress'
      else
        'Upcoming'
      end
    end

  end

end