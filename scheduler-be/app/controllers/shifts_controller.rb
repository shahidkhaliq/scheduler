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
    render json: response
  end
end
