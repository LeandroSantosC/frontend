import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, OutlinedInput, Select } from "@mui/material";
import { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { useMainBoardContext } from "../../context/MainboardContext";

export default function VoiceSelector({voiceOpen, setVoiceOpen}:{voiceOpen: boolean, setVoiceOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    const { voices, selectedVoice, setSelectedVoice } = useMainBoardContext();
    const utterance = new SpeechSynthesisUtterance;
    const { setUser } = useAuth();

    useEffect(() => {
        if (voiceOpen) {
            utterance.text = "Vou falar com essa voz!";
            utterance.voice = selectedVoice;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    }, [selectedVoice]);

    return (
    <Dialog disableEscapeKeyDown open={voiceOpen} onClose={() => setVoiceOpen(false)}>
      <DialogTitle>Selecionar Voz</DialogTitle>
      <DialogContent>
        <Box
          component="form"
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
            flexDirection: { xs: "column", sm: "row" },
          }}
        >
          <FormControl sx={{display: "flex", width: { xs: "100%", sm: "68%" } }}>
            <Select
              native
              value={selectedVoice?.name || ""}
              onChange={(e) =>
                setSelectedVoice(voices.find((voice) => voice.name === e.target.value) || null)
              }
              input={<OutlinedInput id="voice-dialog-native" />}
            >
              {voices
                .filter((voice) => voice.lang === selectedVoice?.lang)
                .map((voice, index) => (
                  <option key={index} value={voice.name}>
                    {voice.name}
                  </option>
                ))}
            </Select>
          </FormControl>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              width: { xs: "100%", sm: "30%" },
              gap: 1,
            }}
          >
            <FormControl sx={{ width: "80%" }}>
              <Select
                native
                value={selectedVoice?.lang || ""}
                onChange={(e) =>
                  setSelectedVoice(voices.find((voice) => voice.lang === e.target.value) || null)
                }
                input={<OutlinedInput id="voice-dialog" />}
              >
                {Array.from(new Set(voices.map((voice) => voice.lang))).map((lang, index) => (
                  <option key={index} value={lang}>
                    {lang}
                  </option>
                ))}
              </Select>
            </FormControl>

            <Icon
              icon="fluent:speaker-2-32-filled"
              width="15%"
              height="100%"
              style={{ cursor: "pointer" }}
              onClick={() => window.speechSynthesis.speak(utterance)}
            />
          </Box>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={() => {
            setVoiceOpen(false);
            window.speechSynthesis.cancel();
          }}
        >
          Cancelar
        </Button>
        <Button
          onClick={() => {
            setUser((prev) =>
              prev ? { ...prev, voice: selectedVoice?.voiceURI } : prev
            );
            setVoiceOpen(false);
            window.speechSynthesis.cancel();
          }}
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  );
}