import axios from 'axios';
import { useQuery,useMutation } from 'react-query';

const useArticles = () => {
    return useQuery('articles', async () => await axios.get(`https://www.alpha-orbital.com/last-100-news.json`));
}


export default useArticles;