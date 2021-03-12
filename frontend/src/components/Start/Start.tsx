import { Link } from 'react-router-dom';
import './Start.css';

const Start: React.FC = () => {

    return (
        <div className="Start">
            <h1>Speed Notes</h1>
            <i className='fa fa-edit'></i>
            <Link className="buttonLink" to="/auth"><button>Login to Acount</button></Link>
            <Link className="spanLink" to="/more-info">More Info</Link>
        </div>
    );
}

export default Start;