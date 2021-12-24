import React, { useEffect, useState } from 'react';
import { Div, Panel, Title } from '@vkontakte/vkui';
import DonutChart from "react-donut-chart";
import { userData } from '../../data/userData'
import { questionsData } from '../../data/questionsData'
import Header from '../../components/Header/Header'

import './End.css';
import { RADICALS, RADICALS_TEMPLATE } from '../../constants';

const End = ({ id, answers }) => {
	const reactDonutChartBackgroundColor = [
		"#5B00C9",
		"#FEB019",
		"#FF4560",
		"#775DD0",
		"#00FFE7",
		"#FF0004",
		"#21E985",
	];
	let reactDonutChartStrokeColor = "#FFFFFF";
	const reactDonutChartOnMouseEnter = (item) => {
		let color = templates.find((q) => q.label === item.label).color;
		reactDonutChartStrokeColor = color;
	};

	const [user, setUser] = useState(null);
	const [templates, setTemplates] = useState([...RADICALS_TEMPLATE]);

	const getMainRadical = () => templates.reduce((acc, curr) => acc.value < curr.value ? curr : acc, templates[0]);


	useEffect(async () => {
		const user = await userData.getUserBaseInfo();
		setUser(user);

		const questions = await questionsData.getQuestions();

		const radicals = RADICALS.map(r => ({...r}));
		answers.forEach((a, i) => {
			const radicalNoForCurrentAnswer = questions[i].Answers[a][1];
			const currentRadical = radicals.find(r => r.id === radicalNoForCurrentAnswer);
			if (currentRadical) {
				currentRadical.couter = currentRadical.couter ? currentRadical.couter + 1 : 1;
			}
		});
		radicals.forEach((r, i) => templates[i].value = Math.round((r.couter || 0) / questions.length * 100));
		setTemplates(templates);
	});

	return (
		<Panel id={id}>
			<Header avatar={user ? user.photo_100 : null} />
			<Div>
				<Title level="1" weight="medium">Результат теста</Title>
			</Div>
			<div className="donut">
				<DonutChart
					width={700}
					height={400}
					onMouseEnter={(item) => reactDonutChartOnMouseEnter(item)}
					strokeColor={reactDonutChartStrokeColor}
					data={templates}
					colors={reactDonutChartBackgroundColor}
					innerRadius={0.5}
					selectedOffset={0.04}
				/>
			</div>
			<Div>
				<Title level="2" weight="medium">У Вас преобладает {getMainRadical() ? getMainRadical().label.toLowerCase() : null} радикал</Title>
				<p>Описание радикала </p>
			</Div>
		</Panel>
	);
};


export default End;
