import {ReactComponent as Logo} from '../../../assets/loader.svg';

const Loader = () => {

    const style={
        width : "40px",
        height : "40px"
    }
    return(
        <div style={{position: "absolute", left: "50%", top : "45%"}}>
            <Logo style={style}/>
        </div>
    );
}

export default Loader;