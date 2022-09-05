// facebook pixel
export const FB_PIXEL_ID = process.env.NEXT_PUBLIC_FACEBOOK_PIXEL_ID;

export const pageviewFpixel = () => {
  window.fbq("track", "PageView");
};

export const eventFpixel = (name, options = {}) => {
  window.fbq("track", name, options);
};
