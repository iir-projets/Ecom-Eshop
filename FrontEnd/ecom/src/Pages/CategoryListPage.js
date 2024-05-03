import CategoryList from "../Components/CategoryList";
import { useLoaderData, json, defer } from 'react-router-dom';
import { getAuthToken } from "../util/auth";

function CategoryListPage() {

    const category  = useLoaderData();

    return (
        <CategoryList category = {category} />
    )
}

export default CategoryListPage;

export async function loader() {

    const token = getAuthToken();
    const response = await fetch(process.env.REACT_APP_BASEURL+'categories',{
        method: "GET",
        headers: {
          'Authorization': 'Bearer ' + token,
        }
      });
  
    if (!response.ok) {
      // return { isError: true, message: 'Could not fetch events.' };
      // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
      //   status: 500,
      // });
      throw json(
        { message: 'Could not fetch events.' },
        {
          status: 500,
        }
      );
    } else {
      const resData = await response.json();
      // console.log("Response Data: "+resData.users[0].email)
      return resData.categories;
    }
  }