export function GET_VIDEOS(){
    return `query{
        videoUploadeds(first:200,skip:0,orderBy:timestamp,orderDirection:desc){
            id
            hash
            title
            description
            location
            category
            thumbnailHash
            date
            author
            timestamp
        }
    }`
}

export function GET_RELATED_VIDEOS(){
    return `query{
        videoUploadeds(first:20,skip:0,orderBy:timestamp,orderDirection:desc){
            id
            hash
            title
            description
            location
            category
            thumbnailHash
            date
            author
            timestamp
        }
    }`
}