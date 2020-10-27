---
id: 587d8251367417b2b2512c65
title: Remove Elements from a Linked List by Index
challengeType: 1
forumTopicId: 301711
---

## Description

<section id='description'>

Before we move on to another data structure, let's get a couple of last bits of practice with linked lists.

Let's write a `removeAt` method that removes the `element` at a given `index`. The method should be called `removeAt(index)`. To remove an `element` at a certain `index`, we'll need to keep a running count of each node as we move along the linked list.

A common technique used to iterate through the elements of a linked list involves a <dfn>'runner'</dfn>, or sentinel, that 'points' at the nodes that your code is comparing. In our case, starting at the `head` of our list, we start with a `currentIndex` variable that starts at `0`. The `currentIndex` should increment by one for each node we pass.

Just like our `remove(element)` method, which [we covered in a previous lesson](/learn/coding-interview-prep/data-structures/remove-elements-from-a-linked-list), we need to be careful not to orphan the rest of our list when we remove the node in our `removeAt(index)` method. We keep our nodes contiguous by making sure that the node that has reference to the removed node has a reference to the next node.

</section>

## Instructions

<section id='instructions'>

Write a `removeAt(index)` method that removes and returns a node at a given `index`. The method should return `null` if the given `index` is either negative, or greater than or equal to the `length` of the linked list.

**Note:** Remember to keep count of the `currentIndex`.

</section>

## Tests

<section id='tests'>

```yml
tests:
  - text: Your <code>LinkedList</code> class should have a <code>removeAt</code> method.
    testString: assert((function(){var test = new LinkedList(); return (typeof test.removeAt === 'function')}()));
  - text: Your <code>removeAt</code> method should reduce the <code>length</code> of the linked list by one.
    testString: assert((function(){var test = new LinkedList(); test.add('cat'); test.add('dog'); test.add('kitten'); test.removeAt(1); return test.size() === 2}()));
  - text: Your <code>removeAt</code> method should remove the element at the specified index from the linked list.
    testString: assert((function(){var test = new LinkedList(); test.add('cat'); test.add('dog'); test.add('kitten'); test.add('bird');test.removeAt(1); return JSON.stringify(test.head()) === '{"element":"cat","next":{"element":"kitten","next":{"element":"bird","next":null}}}'}())); 
  - text: When only one element is present in the linked list, your <code>removeAt</code> method should remove and return the element at specified index, and reduce the length of the linked list.
    testString: assert((function(){var test = new LinkedList(); test.add('cat'); var removedItem = test.removeAt(0); return test.head() === null && test.size() === 0 && removedItem === 'cat';}()));        
  - text: Your <code>removeAt</code> method should return the element of the removed node.
    testString: assert((function(){var test = new LinkedList(); test.add('cat'); test.add('dog'); test.add('kitten');  return test.removeAt(1) === 'dog'}()));
  - text: Your <code>removeAt</code> method should return <code>null</code> and the linked list should not change if the given index is less than <code>0</code>.
    testString: assert((function(){var test = new LinkedList(); test.add('cat'); test.add('dog'); test.add('kitten');  var removedItem = test.removeAt(-1); return removedItem === null && JSON.stringify(test.head()) === '{"element":"cat","next":{"element":"dog","next":{"element":"kitten","next":null}}}'}()));
  - text: Your <code>removeAt</code> method should return <code>null</code> and the linked list should not change if the given index is greater than or equal to the <code>length</code> of the list.
    testString: assert((function(){var test = new LinkedList(); test.add('cat'); test.add('dog'); test.add('kitten');  var removedItem = test.removeAt(3); return removedItem === null && JSON.stringify(test.head()) === '{"element":"cat","next":{"element":"dog","next":{"element":"kitten","next":null}}}'}()));

```

</section>

## Challenge Seed

<section id='challengeSeed'>
<div id='js-seed'>

```js
function LinkedList() {
  var length = 0;
  var head = null;

  var Node = function(element){
    this.element = element;
    this.next = null;
  };

  this.size = function(){
    return length;
  };

  this.head = function(){
    return head;
  };

  this.add = function(element){
    var node = new Node(element);
    if(head === null){
      head = node;
    } else {
      var currentNode = head;

      while(currentNode.next){
        currentNode  = currentNode.next;
      }

      currentNode.next = node;
    }

    length++;
  };

  // Only change code below this line

  // Only change code above this line
}
```

</div>

</section>

## Solution

<section id='solution'>

```js
function LinkedList() {
  var length = 0;
  var head = null;

  var Node = function (element) {
    this.element = element;
    this.next = null;
  };

  this.size = function () {
    return length;
  };

  this.head = function () {
    return head;
  };

  this.add = function (element) {
    var node = new Node(element);
    if (head === null) {
      head = node;
    } else {
      var currentNode = head;

      while (currentNode.next) {
        currentNode = currentNode.next;
      }

      currentNode.next = node;
    }

    length++;
  };

  this.removeAt = function (index) {
    var currentNode = head;
    var previous = head;
    var count = 0;
    if (index >= length || index < 0) {
      return null;
    }
    if (index === 0) {
      var removed = head.element;
      head = currentNode.next;
    } else {
      while (count < index) {
        previous = currentNode;
        currentNode = currentNode.next;
        count++;
      }
      var removed = previous.next.element;
      previous.next = currentNode.next;
    }
    length--;
    return removed;
  };
}
```

</section>
