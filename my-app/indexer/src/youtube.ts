import { VideoUploaded as VideoUploadedEvent } from "../generated/Youtube/Youtube"
import { VideoUploaded } from "../generated/schema"

export function handleVideoUploaded(event: VideoUploadedEvent): void {
  
  let video=new VideoUploaded(event.params.id.toString())
  video.hash = event.params.hash
  video.title = event.params.title
  video.description = event.params.description
  video.location = event.params.location
  video.category = event.params.category
  video.thumbnailHash = event.params.thumbnailHash
  video.date = event.params.date
  video.author = event.params.author
  video.timestamp = event.params.timestamp

  video.blockNumber = event.block.number
  video.blockTimestamp = event.block.timestamp
  video.transactionHash = event.transaction.hash

  video.save()
}
                      