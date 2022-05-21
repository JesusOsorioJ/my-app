import Footer from '../components/Footer';
import Header from '../components/Header';
import Head from '../components/Head';
import {  getCollection, addDocument, onSnapshotData } from '../utils/crud'

import { useEffect, useState } from 'react';

function Home(){
    
    const [data, setData] = useState();
    
    // const getOnSnapshotCollection = async(collectionName)=>{
    //     const col = getCollection(collectionName )
    //     const unsubscribe = onSnapshotData(col, (querySnapshot) => {
    //         const collection = [];
    //         querySnapshot.forEach((doc) => {
    //             collection.push(doc.data());
    //         });
    //         setData(collection)
    //     });
    //     return unsubscribe
    // }

    const HandlerClick = async ()=>{
        const data = {
            "name":"gabriel garcia marquez",
            "novela": "cien años de soledad"
        } 
        addDocument("form", data)
    }

      useEffect(()=>{
        // getCollection('form')
        // getOnSnapshotCollection('form')
      }
      ,[])

 return(
     <>
      <Header />
      <Head />
      {/* <h1>{`Hola mundos ${process.env.REACT_APP_API_KEY}`}</h1>
      <button onClick={HandlerClick} >Añadir</button>
      {data?.map((item)=>(
          <h2>{item.name}</h2>
      ))} */}
      <Footer />
     </>
 )
}
export default Home

// 63
// 39
// 50
