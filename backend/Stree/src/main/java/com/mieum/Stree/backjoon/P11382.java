package com.mieum.Stree.backjoon;

public class P11382 {

	public static void main(String[] args) {
		String input = "77 77 7777";
		int result = 0;
		for (String s : input.split(" ")) {
			result += Integer.parseInt(s);
		}
		System.out.println(result);
	}
}
