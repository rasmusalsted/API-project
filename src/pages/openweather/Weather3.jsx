import { useState, useEffect } from "react";
import Loader from "../../components/Loader";
import Title from "../../components/Title";
import Error from "../../components/Error";

//import map
import { initMap, changeMapView, removeMap } from "../../helpers/leaflet"

// import eget hook - som laver request til API
import useGetData from "../../hooks/useGetData";


// med opslag på adresser/postnumre hos DAWA
const Weather3 = () => {

    // request hook openweather
    const { error, loading, data, getData } = useGetData()

    // request hook DAWA
    const { error: errorDAWA, loading: loadingDAWA, data: dataDAWA, getData: getDataDAWA } = useGetData()


    const [zip, setZip] = useState('8000')



    useEffect(() => {

        if (zip.length === 4 && !isNaN(zip)) {
            getData(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},dk&units=metric&lang=da&appid=${process.env.REACT_APP_WEATHERKEY}`)
        } else {
            //søg i dawa og send brugerens input med (state )
            getDataDAWA("https://api.dataforsyningen.dk/postnumre/autocomplete?q=" + zip)
        }

    }, [zip])
    
    useEffect(() => {
        
      if(data)
       changeMapView([data.coord.lat, data.coord.lon], data.weather[0].description)
     
    }, [data])//lytter efter data fra opvenweather 
    


    // init map
    useEffect(() => {

        initMap([56, 10])

        return () => {
            removeMap()
        }
    }, [])



    return (

        <div className='weather'>

            <Title headline="Vejret + DAWA" />



            {error && <h2>Der er en fejl</h2>}

            {loading && <Loader />}

            <div className="row">

                <div className="col-12 mb-3">

                    <input list="adresseforslag" type="text" placeholder="indtast et postnumer" onInput={(e) => setZip(e.target.value)} defaultValue={zip} />
                    <datalist id="adresseforslag">
                        {
                            dataDAWA && dataDAWA.map(a => <option value={a.tekst} key={a.postnummer.nr} />)
                        }
                    </datalist>

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

                <div id="mapcontainer" style={{ width: "400px", height: "400px", backgroundColor: "silver" }}>
                    Kortet er på vej....
                </div>
            </div>

        </div>

    )

}



export default Weather3;