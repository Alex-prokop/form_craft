import { useState, useEffect, useCallback } from 'react';
import { fetchTopics } from '../api/topicApi';

export const useTopics = () => {
  const [topics, setTopics] = useState<{ id: number; topic_name: string }[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const loadTopics = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const fetchedTopics = await fetchTopics();
      setTopics(fetchedTopics);
    } catch {
      setError('Не удалось загрузить темы');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadTopics();
  }, [loadTopics]);

  return { topics, loading, error, loadTopics };
};
