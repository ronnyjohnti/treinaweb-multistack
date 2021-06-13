import SafeEnvironment from "ui/components/feedback/SafeEnvironment/SafeEnvironment";
import PageTitle from "ui/components/data-display/PageTitle/PageTitle";
import UserInformation from "ui/components/data-display/UserInformation/UserInformation";
import TextFieldMask from "ui/components/inputs/TextFieldMask/TextFieldMask";
import {
  Button,
  CircularProgress,
  Container,
  Typography,
} from "@material-ui/core";
import {
  FormElementsContainer,
  ProfesionalsPaper,
  ProfessionalsContainer,
} from "@styles/pages/index.style";
import React from "react";
import useIndex from "data/hooks/pages/useIndex.page";

export default function Home() {
  const {
    cep,
    setCep,
    validateCep,
    findProfessionals,
    professionals,
    remnantProfessionals,
    error,
    doneQuery,
    loading,
  } = useIndex();

  return (
    <div>
      <SafeEnvironment />
      <PageTitle
        title={"Conheça os profissionais"}
        subtitle={
          "Preencha o seu endereço e veja todos os profissionais da sua localidade"
        }
      />

      <Container>
        <FormElementsContainer>
          <TextFieldMask
            mask={"99.999-999"}
            label={"Digite seu CEP"}
            fullWidth
            variant={"outlined"}
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          />
          {error && <Typography color={"error"}>{error}</Typography>}
          <Button
            variant={"contained"}
            color={"secondary"}
            sx={{ width: "220px" }}
            disabled={!validateCep || loading}
            onClick={findProfessionals}
          >
            {loading ? <CircularProgress size={20} /> : "Buscar"}
          </Button>
        </FormElementsContainer>

        {doneQuery &&
          (professionals.length > 0 ? (
            <ProfesionalsPaper>
              <ProfessionalsContainer>
                {professionals.map((professional, index) => {
                  return (
                    <UserInformation
                      key={index}
                      picture={professional.foto_usuario}
                      name={professional.nome_completo}
                      rating={professional.reputacao}
                      description={professional.cidade}
                    />
                  );
                })}
              </ProfessionalsContainer>

              <Container sx={{ mt: 8, textAlign: "center" }}>
                {remnantProfessionals > 0 ? (
                  <Typography>
                    ... e mais {remnantProfessionals}
                    {remnantProfessionals > 1
                      ? " profissionais atendem "
                      : " profissional atende "}
                    na sua região.
                  </Typography>
                ) : (
                  ""
                )}
                <Button
                  variant={"contained"}
                  color={"secondary"}
                  sx={{ mt: 5 }}
                  children={"Contratar um profissional"}
                />
              </Container>
            </ProfesionalsPaper>
          ) : (
            <Typography align={"center"} color={"textPrimary"}>
              Ainda não temos nenhuma diarista disponível em sua região.
            </Typography>
          ))}
      </Container>
    </div>
  );
}
