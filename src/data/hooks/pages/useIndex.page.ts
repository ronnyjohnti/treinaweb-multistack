import { userShortInterface } from "data/@types/userInterface";
import { ApiService } from "data/services/ApiService";
import { ValidationServices } from "data/services/ValidationServices";
import { useMemo, useState } from "react";

export default function useIndex() {
  const [cep, setCep] = useState(""),
    validateCep = useMemo((): boolean => {
      return ValidationServices.cep(cep);
    }, [cep]),
    [error, setError] = useState(""),
    [doneQuery, setDoneQuery] = useState(false),
    [loading, setLoading] = useState(false),
    [professionals, setProfessionals] = useState([] as userShortInterface[]),
    [remnantProfessionals, setRemnantProfessionals] = useState(0);

  async function findProfessionals() {
    setDoneQuery(false);
    setLoading(true);
    setError("");

    try {
      const { data } = await ApiService.get<{
        diaristas: userShortInterface[]; //Mudar depois de 'diaristas' para 'professionals'
        quantidade_diaristas: number; // mudar depois de 'quantidade_diaristas' para 'remnant_professionals'
      }>("/api/diaristas-cidade?cep=" + cep.replace(/\D/g, ""));
      setProfessionals(data.diaristas);
      setRemnantProfessionals(data.quantidade_diaristas);
      setDoneQuery(true);
      setLoading(false);
    } catch (error) {
      setError("CEP não encontrado");
      setLoading(false);
    }
  }

  return {
    cep,
    setCep,
    validateCep,
    findProfessionals,
    professionals,
    remnantProfessionals,
    error,
    doneQuery,
    loading,
  };
}
