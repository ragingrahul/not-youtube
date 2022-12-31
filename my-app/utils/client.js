import axios from 'axios';

export async function subgraphQuery(query){
    try {
        const SUBGRAPH_URL="https://api.thegraph.com/subgraphs/name/ragingrahul/youtube-clone"
        const response=await axios.post(SUBGRAPH_URL,{query})
        console.log(response.data)
        if(response.data.error){
            console.error(response.data.error)
            throw new Error(`Error making subgraph query: ${response.data.error}`)
        }
        
        return response.data.data
    } catch (error) {
        console.error(error)
        throw new Error(`Could not query the subgraph ${error.message}`)
    }
}