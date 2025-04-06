import '../../styles/Home.css';

const Button = ({ text, onClick, type = 'button', className }) => (
      <button className={className} type={type} onClick={onClick}>
            {text}
      </button>
);

export default Button;
