export type Dev = {
  fname: string;
  lname: string;
  email: string,
  password: string;
  profile_pic: string;
  cover_pic: string;
  phone_number: string;
  skills: JSON;
  social_media_links: JSON;
  work_exp: JSON;
  current_city: string;
  current_position: string;
  about: string;
}

export type MyFormData = {
  [name: string]: string;
}