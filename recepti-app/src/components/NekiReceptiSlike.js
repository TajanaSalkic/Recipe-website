export default function NekiReceptiSlike({imgSrc,pt, category}){
    return(
        <div className="uvod-slike" style={{paddingTop: pt}}>
            <img src={imgSrc} alt=""></img>
            <p className="ime">{category}</p>
        </div>
    )
}