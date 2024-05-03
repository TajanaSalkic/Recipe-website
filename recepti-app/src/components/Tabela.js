import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
export default function Tabela({links}){
    return (
        <div className="tabela">
            <div className="tabela-naslov"> Neki od recepata</div>
            {links.map(link => (
                    <a className="tabela-link" href="#!" key={link.name}>
                        <FontAwesomeIcon icon={Number}></FontAwesomeIcon>
                        {link.name}
                        </a>
                ))}
        </div>
    )
}