import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import './CustomDate.css';

const CustomDatePicker = ({ label, value, onChange }) => {
      return (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <div className="custom-datepicker">
                        <DatePicker label={label} value={value ? dayjs(value) : null} onChange={onChange} format="DD/MM/YYYY" />
                  </div>
            </LocalizationProvider>
      );
};

export default CustomDatePicker;
