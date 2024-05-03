export default function UvodSlika({imgSrc,pt}){
    return(
        <div className="uvod-slike" style={{paddingTop: pt}}>
            <img src={imgSrc} alt=""></img>
        </div>
    )
}