import '../css/main.less';

import {todos} from './state';
import {render} from './view';
import { patch } from 'incremental-dom'

const renderRoom = () => {
  patch(document.body, render)
};

todos.subscribe(renderRoom);
renderRoom();
