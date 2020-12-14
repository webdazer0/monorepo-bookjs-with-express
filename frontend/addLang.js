import { register } from "timeago.js";

const linguaIt = (number, index, total_sec) => {
  return [
    ["poco fa", "poco fa"],
    ["%s secondi fa", "fra %s secondi"],
    ["un minuto fa", "fra un minuto"],
    ["%s minuti fa", "fra %s minuti"],
    ["un'ora fa", "fra un'ora"],
    ["%s ore fa", "fra %s ore"],
    ["un giorno fa", "fra un giorno"],
    ["%s giorni fa", "fra %s giorni"],
    ["una settimana fa", "fra una settimana"],
    ["%s settimane fa", "fra %s settimane"],
    ["un mese fa", "fra un mese"],
    ["%s mesi fa", "fra %s mesi"],
    ["un anno fa", "fra un anno"],
    ["%s anni fa", "fra %s anni"],
  ][index];
};

const lenguaEs = (number, index, total_sec) => {
  return [
    ["justo ahora", "en un rato"],
    ["hace %s segundos", "en %s segundos"],
    ["hace 1 minuto", "en 1 minuto"],
    ["hace %s minutos", "en %s minutos"],
    ["hace 1 hora", "en 1 hora"],
    ["hace %s horas", "en %s horas"],
    ["hace 1 día", "en 1 día"],
    ["hace %s días", "en %s días"],
    ["hace 1 semana", "en 1 semana"],
    ["hace %s semanas", "en %s semanas"],
    ["hace 1 mes", "en 1 mes"],
    ["hace %s meses", "en %s meses"],
    ["hace 1 año", "en 1 año"],
    ["hace %s años", "en %s años"],
  ][index];
};

register("it", linguaIt);
register("es", lenguaEs);
