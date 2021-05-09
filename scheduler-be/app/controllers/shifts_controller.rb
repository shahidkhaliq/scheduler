class ShiftsController < ApplicationController
  def index
    shifts = Shift.all.group_by { |shift| shift.employee.name }

    response = shifts.map do |name, shifts|
      {
        name: name,
        shifts: shifts.map do
          |shift| shift.attributes.except 'id', 'employee_id', 'created_at', 'updated_at'
        end
      }
    end

    sorted_response = response.sort_by do |item| 
      params[:sort_by] == "last_name" ? (item[:name].split)[1] : (item[:name].split)[0]
    end

    render json: sorted_response
  end
end
