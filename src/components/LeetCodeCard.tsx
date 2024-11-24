import React, { useEffect, useState } from 'react';
import { fetchLeetCodeData } from '../utils/leetcode';
import he from 'he';

type LeetCodeCardProps = {
  username: string;
  theme: string;
  type: string;
  border: boolean;
  hide_title: boolean;
  custom_title: string;
};

const LeetCodeCard: React.FC<LeetCodeCardProps> = ({ username,type, theme, border, hide_title, custom_title }) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const result = await fetchLeetCodeData(username);
      setData(result);
      setLoading(false);
    };

    getData();
  }, [username]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!data) {
    return <p>Error fetching data for {username}</p>;
  }

  // Construct the image URL using props
  const imgUrl = `http://leetcode-status.vercel.app/api/${he.encode(type)}/${he.encode(username)}?theme=${he.encode(theme)}&border=${border}&hide_title=${hide_title}&custom_title=${he.encode(custom_title)}`;

  return (
    <div className='flex items-center justify-center rounded'>
          <img src={imgUrl} alt={`${username}'s LeetCode Card`} className="p-2 max-w-80" />
    </div>
  );
};

export default LeetCodeCard;
