export const inputData = `Monkey 0:
  Starting items: 83, 97, 95, 67
  Operation: new = old * 19
  Test: divisible by 17
    If true: throw to monkey 2
    If false: throw to monkey 7

Monkey 1:
  Starting items: 71, 70, 79, 88, 56, 70
  Operation: new = old + 2
  Test: divisible by 19
    If true: throw to monkey 7
    If false: throw to monkey 0

Monkey 2:
  Starting items: 98, 51, 51, 63, 80, 85, 84, 95
  Operation: new = old + 7
  Test: divisible by 7
    If true: throw to monkey 4
    If false: throw to monkey 3

Monkey 3:
  Starting items: 77, 90, 82, 80, 79
  Operation: new = old + 1
  Test: divisible by 11
    If true: throw to monkey 6
    If false: throw to monkey 4

Monkey 4:
  Starting items: 68
  Operation: new = old * 5
  Test: divisible by 13
    If true: throw to monkey 6
    If false: throw to monkey 5

Monkey 5:
  Starting items: 60, 94
  Operation: new = old + 5
  Test: divisible by 3
    If true: throw to monkey 1
    If false: throw to monkey 0

Monkey 6:
  Starting items: 81, 51, 85
  Operation: new = old * old
  Test: divisible by 5
    If true: throw to monkey 5
    If false: throw to monkey 1

Monkey 7:
  Starting items: 98, 81, 63, 65, 84, 71, 84
  Operation: new = old + 3
  Test: divisible by 2
    If true: throw to monkey 2
    If false: throw to monkey 3`;
