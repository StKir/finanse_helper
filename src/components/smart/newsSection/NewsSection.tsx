import Title from '@/components/ui/title/Title';
import { TNewsCategory } from '@/interfaces/store.interfaces';
import { getAllNews, selectAll } from '@/store/slices/NewsSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from './newsSection.module.scss';
import { useEffect, useState } from 'react';
import Loader from '@/components/ui/loader/Loader';
import Error from '@/components/ui/error/Error';
import NewsCard from '@/components/simple/NewsCard/NewsCard';
import { Button, Card } from 'antd';

const NewsSection = () => {
	const [type, SetType] = useState<TNewsCategory>('Business');
	const allNews = useAppSelector(selectAll);
	const newsLoadingStatus = useAppSelector((state) => state.news.LoadingStatus);
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getAllNews(type));
	}, [dispatch, type]);

	return (
		<div className='container'>
			<Title desc='из мира финансов и бизнесса'>Новости</Title>
			<div className={styles.category_btns}>
				<Button
					onClick={() => SetType('Business')}
					type={type === 'Business' ? 'primary' : 'default'}
				>
					Бизнесс
				</Button>
				<Button
					onClick={() => SetType('Top')}
					type={type === 'Top' ? 'primary' : 'default'}
				>
					Главное
				</Button>
				<Button
					onClick={() => SetType('Technology')}
					type={type === 'Technology' ? 'primary' : 'default'}
				>
					Технологии
				</Button>
			</div>
			{newsLoadingStatus === 'error' && <Error />}
			<div className={styles.news_grid}>
				{newsLoadingStatus === 'loading' &&
					[1, 2, 3, 4, 5].map((el) => {
						return (
							<Card
								key={el}
								title='Новость загружается...'
								loading={true}
								bordered={true}
							></Card>
						);
					})}
				{newsLoadingStatus === 'success' &&
					allNews.map((el) => {
						return (
							<NewsCard
								key={el.article_id}
								link={el.link}
								title={el.title}
								description={el.description}
								content={el.content}
								source_id={el.source_id}
								image_url={el.image_url}
							/>
						);
					})}
			</div>
		</div>
	);
};

export default NewsSection;
