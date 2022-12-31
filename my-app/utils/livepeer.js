import { createReactClient } from "@livepeer/react";
import { studioProvider } from "livepeer/providers/studio";

const LivePeerClient = createReactClient({
  provider: studioProvider({ apiKey: "563d13bd-a815-4d4e-9c86-5a0db548b11e" }),
});

export default LivePeerClient;
