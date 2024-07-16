
        using System;

        class Program
        {
            public static void Main(string[] args)
            {
                string[] inputs = new string[] { "5","10","" };
                int index = 0;
                Console.WriteLine("Enter the first number:");
int num1 = int.Parse(inputs[index++]);
Console.WriteLine("Enter the second number:");
int num2 = int.Parse(inputs[index++]);
int sum = num1 + num2;
Console.WriteLine("Sum: " + sum);
            }
        }
    