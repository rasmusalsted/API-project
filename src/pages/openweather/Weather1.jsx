import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import Title from "../../components/Title";
import Error from "../../components/Error";

// import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";



const Weather1 = () => {

    const { error, loading, data, getData } = useGetData()



    const [zip, setZip] = useState('8000')



    useEffect(() => {

        if(zip.length === 4 && !isNaN(zip)){
        getData(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},dk&units=metric&lang=da&appid=${process.env.REACT_APP_WEATHERKEY}`)
        }

    }, [zip])

    return (

        <div className='weather'>

            <Title headline="Dagens vejr" />



            {error && <h2>Der er en fejl</h2>}

            {loading && <Loader />}

            <div className="row">

                <div className="col-12 mb-3">

                    <input type="text" placeholder="indtast et postnumer" onInput={(e) => setZip(e.target.value)} defaultValue={zip} />

                </div>



                {

                    data && <div>

                        <h2>

                            Vejret i {data.name}

                        </h2>

                        <p className='cap-first display-4'>

                            {data.weather[0].description}

                        </p>

                        <p className='display-2'>

                            Temperature: {Math.round(data.main.temp)} &#8451;

                        </p>

                        <p>

                            Luftfugtighed: {data.main.humidity}%

                        </p>

                        <img src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`} alt="ikon" />

                    </div>


                }
            </div>


        </div>

    )

}



export default Weather1;