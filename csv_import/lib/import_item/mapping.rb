class ImportItem
  module Mapping
    # return id for column value if it exists
    def map_field field, value
      if method_name field, :map
        field_action :map, field, value
      else
        default_mapping field, value
      end
    end

    def default_mapping field, value
      Card.fetch_id value unless validate_field field, value
    end

    def merge_corrections
      return unless corrections
      mapped_column_keys.each do |column|
        map = corrections[map_type(column)]
        error "unmapped #{column}" unless correct_value column, map
      end
    end

    def correct_value column, map
      return true unless (old = @row[column]) # no val returns true here (see required)

      new = catch(:unmapped_value) { correct_value_from_map column, map }
      return false if new == false  # unmapped value
      return true if new == old     # mapped value same as current value

      record_correction column, new # corrected value from map
    end

    def correct_value_from_map column, map
      corrected_values = value_array(column).map do |old_value|
        stringify(map[old_value]) || unmapped_value(column)
      end
      corrected_values.compact.join separator(column)
    end

    def unmapped_value column
      return nil unless column.in? required
      throw :unmapped_value, false
    end

    def stringify value
      value.is_a?(Integer) ? "~#{value}" : value
    end

    def record_correction column, new
      @before_corrected[column] = @row_column
      @row[column] = new
    end
  end
end
