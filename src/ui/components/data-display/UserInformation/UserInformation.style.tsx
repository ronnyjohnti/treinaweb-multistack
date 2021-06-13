import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Avatar, Rating } from "@material-ui/core";

export const UserInformationContainer = styled("div")`
  display: grid;
  grid-template-columns: 60px 1fr;
  grid-template-rows: repeat(3, auto);
  grid-template-areas:
    "avatar name"
    "avatar rating"
    "avatar description";
  gap: ${({ theme }) => theme.spacing(.5) + ' ' + theme.spacing(2)};
  align-items: center;
  background-color: ${({ theme }) => theme.palette.grey[50]};
  padding: ${({ theme }) => theme.spacing(3)};

  ${({ theme }) => theme.breakpoints.down('md')} {
    &:nth-of-type(even) {
      background-color: ${({ theme }) => theme.palette.background.paper};
    }
  }
`;

export const UserName = styled("div")`
  color: ${({ theme }) => theme.palette.text.primary};
  grid-area: name;
  font-size: ${({ theme }) => theme.typography.body1.fontSize};
  font-weight: bolder;
`;

export const UserDescription = styled("div")`
  grid-area: description;
  color: ${({ theme }) => theme.palette.text.secondary};
  font-size: ${({ theme }) => theme.typography.body2.fontSize};
`;

export const AvatarStyled = styled(Avatar)`
  grid-area: avatar;
	width: 100%;
	height: initial;
	aspect-ratio: 1;
`;

export const RatingStyled = styled(Rating)`
  grid-area: rating;
  font-size: 14px;
`;
