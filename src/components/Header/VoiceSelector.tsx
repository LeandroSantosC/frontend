import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, OutlinedInput, Select } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";


const getAvailableVoices = (): Promise<SpeechSynthesisVoice[]> => {
    return new Promise((resolve) => {
        let voices = window.speechSynthesis.getVoices();
        if (voices.length) {
            resolve(voices);
        } else {
            // Algumas vezes as vozes ainda não carregaram
            window.speechSynthesis.onvoiceschanged = () => {
                voices = window.speechSynthesis.getVoices();
                resolve(voices);
            };
        }
    });
};

export default function VoiceSelector({voiceOpen, setVoiceOpen}:{voiceOpen: boolean, setVoiceOpen: React.Dispatch<React.SetStateAction<boolean>>}) {
    const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
    const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
    const utterance = new SpeechSynthesisUtterance("Olá! Tudo bem?");
    const { user, setUser } = useAuth();

    useEffect(() => {
        getAvailableVoices().then((availableVoices) => {
            setVoices(availableVoices);
            let selectedVoice: SpeechSynthesisVoice | undefined;
            if(user?.voice) {
                selectedVoice = availableVoices.find((voice) => voice.name === user.voice);
            } else {
                selectedVoice = availableVoices.find((voice) => voice.default);
            }
            if (selectedVoice) {
                setSelectedVoice(selectedVoice);
            }
        });
    }, []);

    useEffect(() => {
        if (selectedVoice) {
            utterance.voice = selectedVoice;
            window.speechSynthesis.cancel();
            window.speechSynthesis.speak(utterance);
        }
    }, [selectedVoice]);

    return (
        <Dialog disableEscapeKeyDown open={voiceOpen} onClose={() => setVoiceOpen(false)}>
            <DialogTitle>Selecionar Voz</DialogTitle>
            <DialogContent>
                <Box component="form" sx={{ display: 'flex', flexWrap: 'wrap' }}>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            native
                            value={selectedVoice?.name || ''}
                            onChange={(e) => {
                                setSelectedVoice(voices.find((voice) => voice.name === e.target.value) || null);
                            }}
                            input={<OutlinedInput id="voice-dialog-native" />}
                            >
                            {voices.map((voice, index) => (
                                <option key={index} value={voice.name}>
                                    {voice.name} ({voice.lang})
                                </option>
                            ))}
                        </Select>
                    </FormControl>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => {
                    setVoiceOpen(false)
                    window.speechSynthesis.cancel();
                    }}>Cancel</Button>
                <Button onClick={() => {
                    setUser(prev => prev ? {...prev, voice: selectedVoice?.voiceURI} : prev)
                    setVoiceOpen(false);
                    window.speechSynthesis.cancel();
                    }}>Ok</Button>
            </DialogActions>
        </Dialog>
    )
}