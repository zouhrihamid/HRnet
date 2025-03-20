import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import './CustomDate.css';

const CustomDatePicker = ({ label, value = null, onChange }) => {
      const formattedValue = value ? dayjs(value).format('YYYY-MM-DD') : '';

      return (
            <div className="custom-select-container">
                  <label>{label}: </label>
                  <DatePicker
                        selected={value ? dayjs(value).toDate() : null}
                        onChange={(date) => onChange(date)}
                        dateFormat="yyyy-MM-dd"
                        className="custom-datepicker"
                        placeholderText={formattedValue || 'yyyy-MM-DD'}
                  />
            </div>
      );
};

export default CustomDatePicker;
