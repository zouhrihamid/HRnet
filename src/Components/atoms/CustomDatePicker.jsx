import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import '../../styles/CustomDate.css';

const CustomDatePicker = ({ label, value, onChange, onBlur }) => {
      const handleBlur = (e) => {
            onBlur(e);
      };

      return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="custom-datepicker">
                        <label>{label} :</label>
                        <DatePicker value={value ? dayjs(value) : null} onChange={onChange} format="DD/MM/YYYY" placeholder="DD/MM/YYYY" onBlur={handleBlur} />
                  </div>
            </LocalizationProvider>
      );
};

export default CustomDatePicker;
