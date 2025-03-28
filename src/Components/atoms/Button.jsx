import '../../styles/Home.css';

const Button = ({ text, onClick, type = 'button' }) => (
      <button className="save" type={type} onClick={onClick}>
            {text}
      </button>
);

export default Button;
