import { Component, KeyboardEvent } from 'react';

type ListProps = {
  items: Array<{ id: string; value: string; data?: any }>;
  onItemClick: (item: { id: string; value: string }) => void;
  listedItem?: boolean;
  listStyle?: string;
  itemStyle?: string;
  onIconClick?: (item: { id: string; value: string }) => void;
  favorites?: Array<{ id: string; value: string }>;
};

type ListState = {
  selectedIndex: number;
};

class List extends Component<ListProps, ListState> {
  favorites: Array<string>;

  constructor(props: ListProps) {
    super(props);
    this.state = {
      selectedIndex: 0
    };
    this.favorites = localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites') || '') : [];
  }

  handleKeyDown = (event: KeyboardEvent) => {
    const { selectedIndex } = this.state;
    const { items } = this.props;

    if (event.key === 'ArrowUp' && selectedIndex > 0) {
      this.setState({ selectedIndex: selectedIndex - 1 });
      this.handleItemClick(items[selectedIndex - 1], selectedIndex - 1);
    } else if (event.key === 'ArrowDown' && selectedIndex < items.length - 1) {
      this.setState({ selectedIndex: selectedIndex + 1 });
      this.handleItemClick(items[selectedIndex + 1], selectedIndex + 1);
    }
  };

  handleItemClick = (item: { id: string; value: string }, index: number): any => {
    const { onItemClick } = this.props;
    onItemClick(item);
    this.setState({ selectedIndex: index });
  };

  handleOnIconClick = (item: { id: string; value: string }): any => {
    const { onIconClick } = this.props;
    onIconClick && onIconClick(item);
  };

  render() {
    const { items } = this.props;
    const { selectedIndex } = this.state;
    const { listedItem } = this.props;
    const { listStyle } = this.props || '';
    const { itemStyle } = this.props || '';

    return (
      <ul onKeyDown={this.handleKeyDown} tabIndex={0} className={`${listStyle}`}>
        {items.map((item, index) => (
          <div key={index} className={index === selectedIndex ? `flex selected ${itemStyle}` : `flex ${itemStyle}`}>
            <li className="w-full" onClick={() => this.handleItemClick(item, index)}>
              <p> {listedItem ? `${item.id}. ${item.value}` : item.value}</p>
            </li>
          </div>
        ))}
      </ul>
    );
  }
}

export default List;
