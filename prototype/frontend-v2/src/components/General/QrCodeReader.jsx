import { useState } from 'react'; 
import QrReader from 'react-qr-reader'; 

const QrCodeReader = () => {

    const [data, setData] = useState(""); 

    const handleError = (err) => {
        console.error(err); 
    }

    const handleScan = (result) => {
        console.log(result); 
        setData(result); 
    }

    return (
        <div>
            <QrReader
                delay={100}
                onError={handleError}
                onScan={handleScan}
            />
        </div>
    )

}

export default QrCodeReader; 