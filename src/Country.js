import './Country.css';

export default function Country(props){
    return <div className="card" onClick={props.selectAnswer}>{props.children}</div>
}