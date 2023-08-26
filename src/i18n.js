// i18n.js
import { createI18n } from "vue-i18n";

const messages = {
  en: {
    Login: "Login",
    Username: "Username",
    Password: "Password",
    CurrencyConverter: "Currency Converter",
    FromCurrency: "From Currency",
    FromCurrencyPlaceHolder: "Input FROM currency here",
    fromCurrencyError: "Currency code must be valid and at least 3 characters",
    toCurrency: "To Currency",
    toCurrencyPlaceHolder: "Input TO currency here",
    toCurrencyError: "Currency code must be valid and at least 3 characters",
    Convert: "Convert",
    last3: "Last 3 Conversions",
    selectMsg: "Please select From and To currencies",
    open:"Open",
    high:"High",
    low:"Low",
    close:"Close",
    Logout:"Logout",
    loading:"Loading",
    APIKey:"API Key",
    APIKeyPlaceHolder:"Please enter your API key here",
    apiKeyError:"API key is required",
  },
  fr: {
    Login: "Se connecter",
    Username: "Nom d'utilisateur",
    Password: "Mot de passe",
    CurrencyConverter: "Convertisseur de devises",
    FromCurrency: "De la devise",
    FromCurrencyPlaceHolder: "Saisissez la devise DEPUIS ici",
    fromCurrencyError:
      "Le code de la devise doit être valide et contenir au moins 3 caractères",
    toCurrency: "Vers la devise",
    toCurrencyPlaceHolder: "Saisissez la devise TO ici",
    toCurrencyError:
      "Le code de la devise doit être valide et contenir au moins 3 caractères",
    Convert: "Convertir",
    last3: "3 dernières conversions",
    selectMsg: "Veuillez sélectionner les devises de départ et d'arrivée",
    open:"Ouvrir",
    high:"Haut",
    low:"Faible",
    close:"Fermer",
    Logout:"Se déconnecter",
    loading:"Chargement",
    APIKey:"clé API",
    APIKeyPlaceHolder:"Veuillez entrer votre clé API ici",
    apiKeyError:"La clé API est requise",
  },
};

const i18n = createI18n({
  legacy: false,
  locale: "en", // set default locale
  messages,
});

export default i18n;
