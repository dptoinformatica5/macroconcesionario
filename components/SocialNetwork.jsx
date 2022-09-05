import React from "react";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  PinterestShareButton,
  TelegramShareButton,
  RedditShareButton,
} from "react-share";
import {
  EmailIcon,
  FacebookIcon,
  LinkedinIcon,
  TwitterIcon,
  WhatsappIcon,
  PinterestIcon,
  RedditIcon,
  TelegramIcon,
} from "react-share";
const SocialNetwork = ({ shareURL }) => {
  return (
    <div className="p-2">
      <h4>Compartir en</h4>

      <FacebookShareButton
        url={shareURL}
        title={"¡Mira este debate en Macroconcesionario!"}
      >
        <FacebookIcon size={30} round={true} />
      </FacebookShareButton>
      <TwitterShareButton
        url={shareURL}
        title={"¡Mira este debate en Macroconcesionario!"}
      >
        <TwitterIcon size={30} round={true} />
      </TwitterShareButton>
      <LinkedinShareButton
        url={shareURL}
        title={"¡Mira este debate en Macroconcesionario!"}
      >
        <LinkedinIcon size={30} round={true} />
      </LinkedinShareButton>
      <WhatsappShareButton
        url={shareURL}
        title={"¡Mira este debate en Macroconcesionario!"}
      >
        <WhatsappIcon size={30} round={true} />
      </WhatsappShareButton>
      <PinterestShareButton
        url={shareURL}
        title={"¡Mira este debate en Macroconcesionario!"}
      >
        <PinterestIcon size={30} round={true} />
      </PinterestShareButton>
      <TelegramShareButton
        url={shareURL}
        title={"¡Mira este debate en Macroconcesionario!"}
      >
        <TelegramIcon size={30} round={true} />
      </TelegramShareButton>
      <RedditShareButton
        url={shareURL}
        title={"¡Mira este debate en Macroconcesionario!"}
      >
        <RedditIcon size={30} round={true} />
      </RedditShareButton>
      <EmailShareButton
        url={shareURL}
        title={"¡Mira este debate en Macroconcesionario!"}
      >
        <EmailIcon size={30} round={true} />
      </EmailShareButton>
    </div>
  );
};

export default SocialNetwork;
