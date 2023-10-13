import Title from '@/components/ui/title/Title';
import { getAllNews, getAllTypeNews, setType } from '@/store/slices/NewsSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
import styles from './newsSection.module.scss';
import { FC, useEffect } from 'react';
import Error from '@/components/ui/error/Error';
import NewsCard from '@/components/simple/NewsCard/NewsCard';
import { Button, Card } from 'antd';
import { INews } from '@/interfaces/store.interfaces';

const NewsSection = () => {
	const type = useAppSelector((state) => state.news.type);
	const allTypeNews = useAppSelector(getAllTypeNews);
	const dispatch = useAppDispatch();

	useEffect(() => {
		if (!allTypeNews.length) dispatch(getAllNews(type));
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch, type]);

	return (
		<div className='container'>
			<Title desc='из мира финансов и бизнесса'>Новости</Title>
			<div className={styles.category_btns}>
				<Button
					onClick={() => dispatch(setType('business'))}
					type={type === 'business' ? 'primary' : 'default'}
				>
					Бизнесс
				</Button>
				<Button
					onClick={() => dispatch(setType('top'))}
					type={type === 'top' ? 'primary' : 'default'}
				>
					Главное
				</Button>
				<Button
					onClick={() => dispatch(setType('technology'))}
					type={type === 'technology' ? 'primary' : 'default'}
				>
					Технологии
				</Button>
			</div>
			<NewsArray allTypeNews={allTypeNews} />
		</div>
	);
};

type TNewsProps = {
	allTypeNews: INews[];
};

const NewsArray: FC<TNewsProps> = ({ allTypeNews }) => {
	const error = useAppSelector((state) => state.news.errorMassage);
	const newsLoadingStatus = useAppSelector((state) => state.news.LoadingStatus);
	return (
		<>
			{newsLoadingStatus === 'error' && <Error massage={error} />}
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
					allTypeNews.map((el) => {
						return (
							<NewsCard
								key={el.article_id}
								link={el.link}
								title={el.title}
								description={el.description}
								content={el.content}
							/>
						);
					})}
				{!allTypeNews.length && <h3>Новостей нет</h3>}
			</div>
		</>
	);
};

export default NewsSection;
